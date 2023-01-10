import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Price.module.sass';
import classNames from 'classnames';

const Price = () => {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.offers}>
          <div className={styles.bronze}>
            <div className={styles.bronzetop}>
              <h3>Bronze</h3>
              <p>Branding on a budget</p>
              <span className={styles.price}>US$299</span>
            </div>
            <ul className={styles.bronzebot}>
              <li className={styles.borderbottom}>
                Price to Winner - $135 (Included)
              </li>
              <li>Validation Services & Upgrades ($39 value)</li>
              <li className={classNames(styles.subli, styles.borderbottom)}>
                <i class="fa fa-check"></i>Matchubg.com URL
              </li>
              <li>Expected 300+ Entries</li>
              <li className={styles.zero}></li>
              <a href="#">
                <i class="fa fa-check"> Start</i>
              </a>
            </ul>
          </div>
          <div className={styles.gold}>
            <div className={styles.goldtop}>
              <h3>Gold</h3>
              <p>Increase participation and basic brand validation</p>
              <span className={styles.price}>US$499</span>
            </div>
            <ul className={styles.goldbot}>
              <li className={styles.borderbottom}>
                Price to Winner - $200 (Included)
              </li>
              <li>Validation Services & Upgrades ($305 value)</li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Matchubg.com URL
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i> Instant Trademark Check (One
                Database)
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>NDA and More Privacy
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Project Promotion (Basic)
              </li>
              <li className={classNames(styles.subli, styles.borderbottom)}>
                <i class="fa fa-check"></i>Comprehensive Trademark Research
              </li>
              <li className={styles.borderbottom}>Expected 600+ Entries</li>
              <li>Partial Refund Option</li>
              <li className={styles.zero}></li>
              <a href="#">
                <i class="fa fa-check"> Start</i>
              </a>
            </ul>
          </div>
          <div className={styles.platinum}>
            <div className={styles.platinumtop}>
              <h3>Platinum</h3>
              <p>
                Work with top-level creatives, plus agency-style brand
                validation
              </p>
              <span className={styles.price}>US$749</span>
            </div>
            <ul className={styles.platinumtopbot}>
              <li className={styles.borderbottom}>
                Price to Winner - $300 (Included)
              </li>
              <li>Validation Services & Upgrades ($979 value)</li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Audience Testing (Up to 6 Names)
                <span style={{ display: 'block', marginLeft: '10px' }}>
                  <a className={styles.botlink} href="#">
                    View Sample Report
                  </a>
                </span>
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i> Comprehensive Trademark Research{' '}
                <span style={{ marginLeft: '30px' }}>(3 Names)</span>
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Linguistics Analysis (3 Names)
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Tier A Creatives
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Matching .com URL
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Instant Trademark Check (4 Databases)
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i> NDA and More Privacy
              </li>
              <li className={styles.subli}>
                <i class="fa fa-check"></i>Enhanced Project Promotion
              </li>
              <li className={classNames(styles.subli, styles.borderbottom)}>
                <i class="fa fa-check"></i>Team Collaboration Tools
              </li>
              <li className={styles.borderbottom}>Expected 1000+ Entries</li>
              <li>Partial Refund Option</li>
              <li className={styles.zero}></li>
              <a className={styles.botplatinuma} href="#">
                <i class="fa fa-check"> Start</i>
              </a>
            </ul>
          </div>
          <div className={styles.managed}>
            <div className={styles.managedtop}>
              <h3>Managed</h3>
              <p>A full agency experience without the agency price tag</p>
              <span className={styles.price}>US$1499</span>
            </div>
            <ul className={styles.managedbot}>
              <li>
                <p style={{ marginBottom: '10px' }}>
                  Receive optimum results from your Platinum Contest by
                  launching a Managed Contest Package and working one-on-one
                  with an experienced Squadhelp Branding Consultant.
                </p>
                <p style={{ marginBottom: '25px' }}>
                  With significantly more validation services, professional
                  brief creation, and daily management of your contest by your
                  Branding Expert, you'll receive an enhanced branding
                  experience to closeout your branding project.
                </p>

                <p>
                  Learn More about{' '}
                  <a className={styles.botlink} href="#">
                    Managed Contest Service
                  </a>
                  <li className={styles.zero}></li>
                  <li className={styles.zero}></li>
                  <a className={styles.botmanaged} href="#">
                    <i class="fa fa-check"> Start</i>
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Price;
