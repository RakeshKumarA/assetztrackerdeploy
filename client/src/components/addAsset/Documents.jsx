import { Grid, Paper } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import CloudUpload from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    marginTop: '20px',
  },
  icon: {
    marginTop: '16px',
    color: '#fff',
    fontSize: '42px',
  },
}));

const Documents = () => {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <section className="container">
      <Paper
        variant="outlined"
        className={classes.root}
        {...getRootProps({ className: 'dropzone' })}
      >
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <CloudUpload className={classes.icon} />
          </Grid>
          <Grid item>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Grid>
        </Grid>
      </Paper>
    </section>
  );
};

export default Documents;
