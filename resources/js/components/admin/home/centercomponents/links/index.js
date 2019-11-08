import React from 'react'
import CenterLinks from './centerLinks'
import CenterCreateLinkForm from './centerCreateLinkForm'
import CenterHeader from '../../centercomponents/centerHeader'
import activeTenantContext, { ActiveTenantContextConsumer } from '../../../contexts/activeTenantContext'
import TenantServices from '../../../../helpers/services/tenantServices'
import LoadingIcon from '../../../../helpers/loadingicon'

export default function Links() {

    const [updateCount, setUpdateCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false)
    const tenantActive = React.useContext(activeTenantContext).activeTenant;
    const [tenantServices, setTenantServices] = React.useState(new TenantServices());

    const [allLinks, setAllLinks] = React.useState([])

    React.useEffect(() => {

        updateAllLinks();

    }, [])

    //to rerender on new link added
    function updateAllLinks()
    {
        setLoading(true);

        tenantServices.getAllLinks({
        }, tenantActive.id)
            .then(response => {
                setLoading(false);
                if (response.data.success) {
                    setAllLinks(response.data.success)
                }
                return response;
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status == 401 && error.response.data.error) {
                }
            });
    }

    return (
        <div>
            {loading ?
                <LoadingIcon />
                :
                <div>
                    <CenterHeader />
                    <CenterCreateLinkForm
                        updateAllLinks={updateAllLinks}
                    />
                    {
                        allLinks.map(function (link, index) {
                            return (<CenterLinks
                                link={link}
                                key={index}
                            />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}