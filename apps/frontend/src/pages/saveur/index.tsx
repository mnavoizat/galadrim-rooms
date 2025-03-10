import { Home } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import BackIcon from '@mui/icons-material/ChevronLeft'
import { Box } from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { CustomLink } from '../../components/Core/CustomLink'
import { RoundedLinks } from '../../components/Link/RoundedLinks'
import { HouseMarkerIcon } from '../../components/saveur/markers/HouseMarker'
import { RestaurantMarkers } from '../../components/saveur/restaurants/RestaurantMarkers'
import { SaveurLeftMenu } from '../../components/saveur/restaurants/SaveurLeftMenu'
import { AppStore } from '../../stores/AppStore'
import { notifyUser } from '../../utils/notification'

export const POSITION_LOCAUX_BONNE_NOUVELLE: [number, number] = [48.87012, 2.34923]

export const MAX_ZOOM = 18

const SaveurPage = () => {
    const saveurStore = AppStore.saveurStore

    useEffect(() => {
        notifyUser('Work in progress', 'info', 2000)
    }, [])

    return (
        <>
            <RoundedLinks
                linkInfos={[
                    { Icon: Home, link: '/' },
                    { Icon: AddIcon, link: '/saveur/createRestaurant' },
                ]}
                horizontalPosition="right"
            />
            <MapContainer
                style={{
                    width: '100%',
                    height: '100%',
                    zIndex: 5,
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                }}
                center={POSITION_LOCAUX_BONNE_NOUVELLE}
                zoom={17}
                maxZoom={MAX_ZOOM}
                scrollWheelZoom
                doubleClickZoom={false}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://worldtiles3.waze.com/tiles/{z}/{x}/{y}.png"
                />
                <Marker position={POSITION_LOCAUX_BONNE_NOUVELLE} icon={HouseMarkerIcon}>
                    <Popup offset={new L.Point(0, -20)}>Les locaux</Popup>
                </Marker>
                <RestaurantMarkers saveurStore={saveurStore} />
            </MapContainer>
            <SaveurLeftMenu saveurStore={saveurStore} />
            <Box
                sx={{
                    zIndex: 10,
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    p: 1,
                }}
            >
                <CustomLink to="/">
                    <BackIcon /> Retour à l'accueil
                </CustomLink>
            </Box>
        </>
    )
}

export default observer(SaveurPage)
