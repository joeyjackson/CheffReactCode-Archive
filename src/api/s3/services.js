import Amplify, { Storage } from 'aws-amplify';
import awsconfig from '../aws-exports.js';

//Configure Storage with S3 bucket information
export function SetS3Config(bucket, level) {
  Storage.configure({
    bucket: bucket,
    level: level
  });
}
