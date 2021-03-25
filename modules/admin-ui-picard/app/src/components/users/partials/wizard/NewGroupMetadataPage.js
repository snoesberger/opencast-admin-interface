import React from "react";
import WizardNavigationButtons from "../../../shared/wizard/WizardNavigationButtons";
import {useTranslation} from "react-i18next";
import {Field} from "formik";

/**
 * This component renders the metadata page for new groups in the new groups wizard
 */
const NewGroupMetadataPage = ({ nextPage, formik }) => {

    const { t } = useTranslation();

    return(
        <>
            {/* Fields for name and description */}
            <div className="modal-content">
                <div className="modal-body">
                    <div className="form-container">
                        <div className="row">
                           <label className="required">{t('USERS.GROUPS.DETAILS.FORM.NAME')}</label>
                            <Field tabIndex="1"
                                   type="text"
                                   focushere
                                   placeholder={t('USERS.GROUPS.DETAILS.FORM.NAME')}
                                   name="name"/>
                        </div>
                        <div className="row">
                            <label>{t('USERS.GROUPS.DETAILS.FORM.DESCRIPTION')}</label>
                            <Field as="textarea"
                                   tabIndex="2"
                                   placeholder={t('USERS.GROUPS.DETAILS.FORM.DESCRIPTION')}
                                   name="description"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button for navigation to next page */}
            <WizardNavigationButtons isFirst
                                     formik={formik}
                                     nextPage={nextPage}/>
        </>
    );
};

export default NewGroupMetadataPage;
