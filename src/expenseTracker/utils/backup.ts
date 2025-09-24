import RNFS from "react-native-fs";
import { getRealmPath, getRealm } from "../db/realm";
import Share from "react-native-share";
import DocumentPicker from "react-native-document-picker";
import { Alert } from "react-native";

// Export (backup)
export async function exportRealmFile() {
  try {
    const realmPath = getRealmPath();
    // choose a destination path inside app documents
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const destPath = `${RNFS.DocumentDirectoryPath}/expense-backup-${timestamp}.realm`;

    // copy realm file (and realm.lock / realm.management if you want)
    await RNFS.copyFile(realmPath, destPath);

    // share file so user can save it outside app
    await Share.open({
      url: `file://${destPath}`,
      title: "Export Expense Backup",
    });
  } catch (err) {
    console.error("Export error", err);
    Alert.alert("Export failed", String(err));
  }
}

// Import (restore)
// We'll ask user to pick a file (a realm file), then replace current realm file.
export async function importRealmFile() {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });

    // res.uri may vary by platform; convert to path for RNFS if needed
    const pickedPath = res.uri.replace("file://", ""); // adjust if necessary

    const realmPath = getRealmPath();
    // Close current realm before replacing
    const realm = getRealm();
    if (!realm.isClosed) {
      realm.close();
    }

    // Overwrite current realm file
    await RNFS.copyFile(pickedPath, realmPath);

    // reopen realm (next time getRealm is called it will open new file)
    Alert.alert("Restore successful", "Backup restored. Restarting DB connection.");
    // Optionally, you can programmatically reload or force state refresh in your app.
  } catch (err: any) {
    if (DocumentPicker.isCancel(err)) {
      // user cancelled
      return;
    }
    console.error("Import error", err);
    Alert.alert("Import failed", String(err));
  }
}
