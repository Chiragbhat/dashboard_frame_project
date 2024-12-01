import React, { useState } from "react";
import "../CSS/NavigationTab.css"

function NavigationTab(){

    const [activeSection, setActiveSection] = useState(0); // 0 for the first section, 1 for second, 2 for third sub-section respectively.

    //function to handle clicks on sub-sections
    const handleSectionClick = (index) => {
        setActiveSection(index);
    };

    const [expandedSection, setExpandedSection] = useState(0); // Track expanded state (0 means expanded, and null means disappearance of sub section)

    // Handle expanding/disappearing of sections
    const handleToggleExpansion = (index) => {
        setExpandedSection(expandedSection === index ? null : index);
    };


    return(
        <>
          <div className='name-and-icon'>
          <img className='icon cursor-pointer' src={'/assets/images/icon.svg'} alt='Icon' />

          <img className='name cursor-pointer' src={'/assets/images/name.svg'} alt='Name' />
          </div>

          <div className='nav-bar-section d-flex flex-column'>
            <div className='sections d-flex cursor-pointer section-padding'>
              <img className='dashboard-icon' src={'/assets/images/dashboard-icon.svg'} alt='dashboard-icon' />

              <div className='d-flex justify-content-between w-100'>
                <div className='section-name'>Dashboard</div>

                <img className='section-down-arrow cursor-pointer' src={'/assets/images/section-down-arrow.svg'} alt='section-down-arrow' />
              </div>
            </div>

            <div className='sections d-flex cursor-pointer section-padding'>
              <img className='dashboard-icon' src={'/assets/images/geo-icon.svg'} alt='geo-icon' />

              <div className='d-flex justify-content-between w-100'>
                <div className='section-name'>Geo Experiment</div>

                <img className='section-down-arrow cursor-pointer' src={'/assets/images/section-down-arrow.svg'} alt='section-down-arrow' />
              </div>
            </div>

            <div className='sections d-flex cursor-pointer section-padding'>
              <img className='dashboard-icon' src={'/assets/images/mmm-icon.svg'} alt='mmm-icon' />

              <div className='d-flex justify-content-between w-100'>
                <div className='section-name'>MMM</div>

                <img className='section-down-arrow cursor-pointer' src={'/assets/images/section-down-arrow.svg'} alt='section-down-arrow' />
              </div>
            </div>

            <div className='sections d-flex cursor-pointer section-padding'>
              <img className='dashboard-icon' src={'/assets/images/attribution-icon.svg'} alt='attribution-icon' />

              <div className='d-flex justify-content-between w-100'>
                <div className='section-name'>Attribution</div>

                <img className='section-down-arrow cursor-pointer' src={'/assets/images/section-down-arrow.svg'} alt='section-down-arrow' />
              </div>
            </div>

            <div className='sections d-flex flex-column'>
              <div className='d-flex w-100 cursor-pointer section-padding'>
                <img className='dashboard-icon' src={'/assets/images/client_onboarding-icon.svg'} alt='client_onboarding-icon' />

                <div className='d-flex justify-content-between w-100'>
                  <div className='section-name'>Client Onboarding</div>

                  <img 
                    className={`section-down-arrow ${expandedSection === null ? '' : 'd-none'}`} 
                    src={'/assets/images/section-down-arrow.svg'} 
                    alt='section-down-arrow' 
                    onClick={() => handleToggleExpansion(0)}
                  />

                  <img 
                    className={`section-up-arrow ${expandedSection !== null ? '' : 'd-none'}`} 
                    src={'/assets/images/section-up-arrow.svg'} 
                    alt='section-up-arrow' 
                    onClick={() => handleToggleExpansion(0)}
                  />
                </div>
              </div>

              <div className={`${expandedSection !== null ? '' : 'd-none'}`}>
                <div className={`section-sub-content d-flex align-items-center ${activeSection === 0 ? 'section-sub-content-selected' : ''}`}
                  onClick={() => handleSectionClick(0)}>
                  <img className='dashboard-icon' src={'/assets/images/user-management.svg'} alt='user-management-icon' />

                  <div className='section-name'>User Management</div>
                </div>

                <div className={`section-sub-content d-flex align-items-center ${activeSection === 1 ? 'section-sub-content-selected' : ''}`}
                  onClick={() => handleSectionClick(1)}>
                  <img className='dashboard-icon' src={'/assets/images/data-integrations.svg'} alt='data-integrations-icon' />

                  <div className='section-name'>Data Integrations</div>
                </div>

                <div className={`section-sub-content d-flex align-items-center ${activeSection === 2 ? 'section-sub-content-selected' : ''}`}
                  onClick={() => handleSectionClick(2)}>
                  <img className='dashboard-icon' src={'/assets/images/business-setup.svg'} alt='business-setup-icon' />

                  <div className='section-name'>Business Setup</div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default NavigationTab;