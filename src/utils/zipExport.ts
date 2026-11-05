import JSZip from 'jszip';
import { FLUTTER_FILES } from '../data/flutterFiles';

export async function downloadFlutterProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root folder
  const root = zip.folder('quizmaster_flutter');

  if (!root) return;

  // Add all files
  for (const file of FLUTTER_FILES) {
    root.file(file.path, file.content);
  }

  // Add extra android build files
  root.file(
    'android/app/build.gradle',
    `plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}

android {
    namespace = "com.khitguntur.quizmaster"
    compileSdk = 34
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId = "com.khitguntur.quizmaster"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.debug
            minifyEnabled = false
            shrinkResources = false
        }
    }
}

flutter {
    source = "../.."
}
`
  );

  root.file(
    'android/app/src/main/AndroidManifest.xml',
    `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.khitguntur.quizmaster">
    <application
        android:label="QuizMaster"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
`
  );

  // Generate ZIP blob
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'QuizMaster_Flutter_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
