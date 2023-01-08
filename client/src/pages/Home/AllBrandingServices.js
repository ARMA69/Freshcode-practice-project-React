import React from 'react';
import styles from './AllBrandingServices.module.sass';
import arrowrightline from './imgs/arrowrightline.svg';
import star from './imgs/star.png';
import usersalt from './imgs/usersalt.png';
import user from './imgs/user.png';
import comment from './imgs/comment.png';
import camcorder from './imgs/camcorder.png';
import pulse from './imgs/pulse.png';
import badge from './imgs/badge.png';
import comments from './imgs/comments.png';
import bellschool from './imgs/bellschool.png';

const AllBrandingServices = () => {
  return (
    <div className={styles.branservices}>
      <h2>All Branding Agency Services</h2>
      <p className={styles.description}>
        Let our Squad of 250K+ experts from around the world help you launch
        your brand!
      </p>
      <div className={styles.brancards}>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={star} /> Premium Domains
            </h3>
            <p>Curated brandable domains available for immediate purchase</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={usersalt} /> Naming Contests
            </h3>
            <p>Crowdsourced Name ideas from our creative community</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={user} /> Managed Contests
            </h3>
            <p>Full Agency-level Experience, lead by Branding Consultant</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={comment} /> Logo Contests
            </h3>
            <p style={{ paddingBottom: '25px' }}>
              Professional logo design contests
            </p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>

        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={comments} /> Tagline Contests
            </h3>
            <p>
              Taglines, slogam and strapline ideas from our creative community
            </p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={camcorder} /> Video Creation
            </h3>
            <p>Get perfecty branded videos optimized for results</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={pulse} /> Audience Testing
            </h3>
            <p>
              Fast, effective naming and branding research with consumer test
              panels
            </p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={badge} /> Trademark Research
            </h3>
            <p>Comprehensive trademark Research across 100+ countries</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
        <div className={styles.brancard}>
          <div>
            <h3>
              <img src={bellschool} /> Trademark Filing
            </h3>
            <p>Trademark filing service by Licensed Trademark attorneys</p>
          </div>
          <div>
            <img src={arrowrightline} alt="arror" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBrandingServices;
