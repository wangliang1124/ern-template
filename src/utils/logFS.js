import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import { zip } from 'react-native-zip-archive';
import { name as appName } from '../../app.json';

const LOG_SAVED_DAYS = 7;
const LOG_EXT = '.log';
const ENDCODING = 'utf8';
const UPLOAD_FILE_PREFIX = 'erntemplate_';

// `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
const LogDir = `${RNFS.DocumentDirectoryPath}/logs`;
const UploadUrl = 'https://cs.edison.tech/api/log2/';

const getLogFilePath = () => {
  const fileName = new Date().toISOString().slice(0, 10);
  return `${LogDir}/${fileName}${LOG_EXT}`;
};

export async function createLogFile() {
  try {
    const filePath = getLogFilePath();

    if (await RNFS.exists(filePath)) {
      console.log('file exists');

      return;
    }

    const [err, files] = await readDir();
    if (err) {
      RNFS.mkdir(LogDir); // create a 'logs' dir if not exist
    } else {
      clearLogDir(files); // clear dir if file number more than LOG_SAVED_DAYS
    }

    // write the file
    RNFS.writeFile(filePath, '', ENDCODING)
      .then((success) => {
        console.log('success: CREATE FILE!');
      })
      .catch((err) => {
        console.log(`error happened:${err.message}`);
      });
  } catch (error) {
    console.error('create file error', error);
  }
}

function readDir() {
  return RNFS.readDir(LogDir)
    .then((result) => [null, result.filter((file) => file.name.toLowerCase().endsWith(LOG_EXT))])
    .catch((err) => [err, []]);
}

export function clearLogDir(files) {
  if (files.length < LOG_SAVED_DAYS) {
    return;
  }

  const oldestFile = files.sort((a, b) => a.mtime.getTime() - b.mtime.getTime())[0];

  RNFS.unlink(oldestFile.path)
    .then(() => {
      console.log('LOG FILE DELETED');
    })
    .catch((err) => {
      // `unlink` will throw an error, if the item to unlink does not exist
      console.log(err.message);
    });
}

export async function emptyLogDir() {
  const [, files] = await readDir();
  files.forEach((file) => {
    RNFS.unlink(file.path)
      .then(() => {
        console.log('LOG FILE DELETED');
      })
      .catch((err) => {
        // `unlink` will throw an error, if the item to unlink does not exist
        console.log(err.message);
      });
  });
}

export function readLogFile() {
  readDir()
    .then((statResult) => {
      console.log('statResult---', statResult);
      const [err, files] = statResult;
      if (!err && files.length > 0 && files[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(files[0].path, ENDCODING);
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.error('readLogFile error:', err.message, err.code);
    });
}

export function writeLogFile(log) {
  // if file not exist, it will be created
  RNFS.appendFile(getLogFilePath(), log)
    .then(() => {
      console.log('write success');
    })
    .catch((err) => {
      console.error('write log file error', err);
    });
}

export async function uploadLogFiles(fields = {}, begin = () => {}, progress = () => {}) {
  const dateString = new Date().toISOString();
  const fileName = `${UPLOAD_FILE_PREFIX}${dateString}.zip`;
  const zipPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  await zip(LogDir, zipPath)
    .then((path) => {
      console.log(`zip completed at ${path}`);
      return path;
    })
    .catch((error) => {
      console.error(`zip error:${error}`);
    });

  const files = [
    {
      filename: fileName,
      filepath: zipPath,
      filetype: 'application/zip',
    },
  ];

  RNFS.uploadFiles({
    toUrl: UploadUrl,
    files,
    method: 'POST',
    fields: {
      app: appName,
      platform: Platform.OS,
      device_id: DeviceInfo.getDeviceId(),
      apiLevel: await DeviceInfo.getApiLevel(),
      time: new Date().toISOString(),
      level: 'error',
      buildNumber: DeviceInfo.getBuildNumber(),
      version: '',
      logID: '',
      data: '',
      ...fields,
    },
    begin: () => {
      console.log('----- start upload log files');
    },
    progress: (res) => {
      console.log('---- upload log files progress----', res);
    },
  })
    .promise.then((response) => {
      if (response.statusCode === 200) {
        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    })
    .catch((err) => {
      console.error('upload error:', err);
    })
    .finally(() =>
      // `unlink` will throw an error, if the item to unlink does not exist
      RNFS.unlink(zipPath)
        .then(() => {
          console.log('FILE DELETED');
        })
        .catch((err) => {
          console.error(err.message);
        }),
    );
}
