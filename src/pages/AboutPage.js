// src/pages/AboutPage.js
import React from 'react';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <>
      {/* Banner Section - Uses global classes */}
      <div className="row">
        <div className="banner">
          {/* NOTE: Ensure 'banner.png' exists in the public/images/ folder */}
          <img src="/images/banner.png" alt="Banner Image" />
        </div>
      </div>

      {/* About Container */}
      <div className={styles.aboutContainer}>
        <h1 className={styles.pageTitle}>Meet Our Team</h1>

        <div className={styles.teamMembers}>
          {/* Team Member 1 */}
          <div className={styles.teamMember}>
            <div className={styles.profilePhotoContainer}>
              {/* NOTE: Ensure 'varun-photo.png' exists in public/images/ folder */}
              <img className={styles.profilePhoto} src="/images/varun-photo.png" alt="Varun Karamchandani" />
            </div>
            <h2 className={styles.memberName}>Varun Karamchandani</h2>
            <p className={styles.memberTitle}>23BCE0523</p>
            <div className={styles.socialLinks}>
               {/* NOTE: Verify these links are correct */}
              <a href="https://www.linkedin.com/in/varun-kumar-karamchandani-71a840301/" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                 </svg>
              </a>
              <a href="https://www.instagram.com/selester11?igsh=aHlldWtzOThqZXkx" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                 </svg>
              </a>
            </div>
             {/* NOTE: You can add a <p className={styles.memberBio}>...</p> here if you want to add descriptions */}
          </div>

          {/* Team Member 2 */}
          <div className={styles.teamMember}>
             <div className={styles.profilePhotoContainer}>
                {/* NOTE: Ensure 'cavin-photo.jpeg' exists in public/images/ folder */}
               <img className={styles.profilePhoto} src="/images/cavin-photo.jpeg" alt="Cavin Allwyn Monis"/>
             </div>
             <h2 className={styles.memberName}>Cavin Allwyn Monis</h2>
             <p className={styles.memberTitle}>23BCE0529</p>
             <div className={styles.socialLinks}>
                  {/* NOTE: Verify these links are correct */}
                 <a href="https://www.linkedin.com/in/cavin-monis-04a012288/" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                         <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                     </svg>
                 </a>
                 <a href="https://www.instagram.com/cavin.monis?igsh=MWlza2gyeDlwdGRmcw==" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                         <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                 </a>
             </div>
              {/* NOTE: You can add a <p className={styles.memberBio}>...</p> here if you want to add descriptions */}
          </div>

          {/* Team Member 3 */}
           <div className={styles.teamMember}>
             <div className={styles.profilePhotoContainer}>
                 {/* NOTE: Ensure 'vatsa-photo.png' exists in public/images/ folder */}
                <img className={styles.profilePhoto} src="/images/vatsa-photo.png" alt="Srivatsa Singaraju"/>
             </div>
             <h2 className={styles.memberName}>Srivatsa Singaraju</h2>
             <p className={styles.memberTitle}>23BAI0082</p>
             <div className={styles.socialLinks}>
                 {/* NOTE: Verify these links are correct */}
                <a href="https://www.linkedin.com/in/srivatsa-singaraju-aa19a928a/" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                   </svg>
                </a>
                <a href="https://www.instagram.com/mirrorball_013?igsh=eG13MGZkM2U1bjR5&utm_source=qr" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                   </svg>
                </a>
             </div>
              {/* NOTE: You can add a <p className={styles.memberBio}>...</p> here if you want to add descriptions */}
           </div>

        </div>
      </div>
    </>
  );
}

export default AboutPage;