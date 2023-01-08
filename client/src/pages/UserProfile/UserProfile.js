import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import styles from './UserProfile.module.sass';
import CONSTANTS from '../../constants';
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import { cashOut, changeProfileModeView, clearPaymentStore } from '../../actions/actionCreator';
import Error from '../../components/Error/Error';

const UserProfile = (props) => {
  const pay = (values) => {
    const {
      number, expiry, cvc, sum,
    } = values;
    props.cashOut({
      number, expiry, cvc, sum,
    });
  };

  const {
    balance, role, profileModeView, changeProfileModeView, error, clearPaymentStore,
  } = props;
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, { [styles.currentOption]: profileModeView === CONSTANTS.USER_INFO_MODE })}
              onClick={() => changeProfileModeView(CONSTANTS.USER_INFO_MODE)}
            >
              UserInfo
            </div>
            {role === CONSTANTS.CREATOR && (
              <div
                className={classNames(styles.optionContainer, { [styles.currentOption]: profileModeView === CONSTANTS.CASHOUT_MODE })}
                onClick={() => changeProfileModeView(CONSTANTS.CASHOUT_MODE)}
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {
                    profileModeView === CONSTANTS.USER_INFO_MODE
                      ? <UserInfo />
                      : (
                        <div className={styles.container}>
                          {parseInt(balance) === 0
                            ? <span className={styles.notMoney}>There is no money on your balance</span>
                            : (
                              <div>
                                {error
                                    && <Error data={error.data} status={error.status} clearError={clearPaymentStore} />}
                                <PayForm sendRequest={pay} />
                              </div>
                            )}
                        </div>
                      )
                }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data;
  const { profileModeView } = state.userProfile;
  const { error } = state.payment;
  return {
    balance, role, profileModeView, error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cashOut: (data) => dispatch(cashOut(data)),
  changeProfileModeView: (data) => dispatch(changeProfileModeView(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
