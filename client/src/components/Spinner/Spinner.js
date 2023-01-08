import React from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import styles from './Spinner.module.sass';

const override = css`border-color: #46568a;`;

const SpinnerLoader = (props) => (
  <div style={{ marginTop: props.mtop ? 30 : undefined }} className={styles.loaderContainer}>
    <ClipLoader
      sizeUnit="px"
      css={override}
      size={50}
      color="#46568a"
      loading
    />
  </div>
);

export default SpinnerLoader;
