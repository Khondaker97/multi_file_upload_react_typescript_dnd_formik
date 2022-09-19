import React, { useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import SingleFile from "./SingleFile";

export interface uploadableFile {
  file: File;
  errors: FileError[];
}

const MultipleFileUploadField = () => {
  const [files, setFiles] = useState<uploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errros: [] }));
    setFiles(
      (curr) => [...curr, ...mappedAcc, ...rejFiles] as uploadableFile[]
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {files.map((fileWrapper, i) => (
          <SingleFile key={i} file={fileWrapper.file} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MultipleFileUploadField;
