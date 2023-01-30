import React from 'react'
import { Typography } from '@mui/material'

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '0 16px' }}>
      <Typography variant="h6">Privacy Policy</Typography>
      <Typography variant="body2">
        Luca Fernandez built the DnD Sheet app as a Free app. This SERVICE is
        provided by Luca Fernandez at no cost and is intended for use as is.
      </Typography>
      <Typography variant="body2">
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service.
      </Typography>
      <Typography variant="body2">
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </Typography>
      <Typography variant="body2">
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at DnD Sheet unless otherwise
        defined in this Privacy Policy.
      </Typography>
      <Typography variant="h6">Information Collection and Use</Typography>
      <Typography variant="body2">
        For a better experience, while using our Service, I may require you to
        provide us with certain personally identifiable information. The
        information that I request will be retained on your device and is not
        collected by me in any way.
      </Typography>
      <div>
        <Typography variant="body2">
          The app does use third party services that may collect information
          used to identify you.
        </Typography>
        <Typography variant="body2">
          Link to privacy policy of third party service providers used by the
          app
        </Typography>
        <ul>
          <li>
            <a href="https://www.google.com/policies/privacy/" target="_blank">
              <Typography variant="caption">Google Play Services</Typography>
            </a>
          </li>
          <li>
            <a
              href="https://firebase.google.com/policies/analytics"
              target="_blank"
            >
              <Typography variant="caption">
                Google Analytics for Firebase
              </Typography>
            </a>
          </li>
        </ul>
      </div>
      <Typography variant="h6">Log Data</Typography>
      <Typography variant="body2">
        I want to inform you that whenever you use my Service, in a case of an
        error in the app I collect data and information (through third party
        products) on your phone called Log Data. This Log Data may include
        information such as your device Internet Protocol (“IP”) address, device
        name, operating system version, the configuration of the app when
        utilizing my Service, the time and date of your use of the Service, and
        other statistics.
      </Typography>
      <Typography variant="h6">Cookies</Typography>
      <Typography variant="body2">
        Cookies are files with a small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        websites that you visit and are stored on your device's internal memory.
      </Typography>
      <Typography variant="body2">
        This Service does not use these “cookies” explicitly. However, the app
        may use third party code and libraries that use “cookies” to collect
        information and improve their services. You have the option to either
        accept or refuse these cookies and know when a cookie is being sent to
        your device. If you choose to refuse our cookies, you may not be able to
        use some portions of this Service.
      </Typography>
      <Typography variant="h6">Service Providers</Typography>
      <Typography variant="body2">
        I may employ third-party companies and individuals due to the following
        reasons:
      </Typography>
      <ul>
        <li>
          <Typography variant="caption">To facilitate our Service;</Typography>
        </li>
        <li>
          <Typography variant="caption">
            To provide the Service on our behalf;
          </Typography>
        </li>
        <li>
          <Typography variant="caption">
            To perform Service-related services; or
          </Typography>
        </li>
        <li>
          <Typography variant="caption">
            To assist us in analyzing how our Service is used.
          </Typography>
        </li>
      </ul>
      <Typography variant="body2">
        I want to inform users of this Service that these third parties have
        access to your Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </Typography>
      <Typography variant="h6">Security</Typography>
      <Typography variant="body2">
        I value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and I cannot guarantee
        its absolute security.
      </Typography>
      <Typography variant="h6">Links to Other Sites</Typography>
      <Typography variant="body2">
        This Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by me. Therefore, I strongly advise you
        to review the Privacy Policy of these websites. I have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </Typography>
      <Typography variant="h6">Children’s Privacy</Typography>
      <Typography variant="body2">
        These Services do not address anyone under the age of 13. I do not
        knowingly collect personally identifiable information from children
        under 13. In the case I discover that a child under 13 has provided me
        with personal information, I immediately delete this from our servers.
        If you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact me so that I will
        be able to do necessary actions.
      </Typography>
      <Typography variant="h6">Changes to This Privacy Policy</Typography>
      <Typography variant="body2">
        I may update our Privacy Policy from time to time. Thus, you are advised
        to review this page periodically for any changes. I will notify you of
        any changes by posting the new Privacy Policy on this page.
      </Typography>
      <Typography variant="body2">
        This policy is effective as of 2020-04-12
      </Typography>
      <Typography variant="h6">Contact Us</Typography>
      <Typography variant="body2">
        If you have any questions or suggestions about my Privacy Policy, do not
        hesitate to contact me at .
      </Typography>
      <Typography variant="body2">
        This privacy policy page was created at
      </Typography>
      <Typography variant="body2">
        <a href="https://privacypolicytemplate.net" target="_blank">
          privacypolicytemplate.net
        </a>
      </Typography>
      <Typography variant="body2">and modified/generated by</Typography>
      <Typography
        variant="body2"
        style={{ display: 'inline-block', marginBottom: 16 }}
      >
        <a
          href="https://app-privacy-policy-generator.firebaseapp.com/"
          target="_blank"
        >
          App Privacy Policy Generator
        </a>
      </Typography>
    </div>
  )
}

export default PrivacyPolicy
