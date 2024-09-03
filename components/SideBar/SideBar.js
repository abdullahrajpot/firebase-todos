import './sideBar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BorderTopOutlinedIcon from '@mui/icons-material/BorderTopOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useAuthContext } from '../../Contexts/AuthContext';

const SideBar = () => {
    const { handleLogout} = useAuthContext();
    return (
        <div className='sidebar'>
            <div className="top"><span className="logo">Codely</span></div>
            <hr />
            <div className="center">
                <ul>
                <p className="title">Main</p>
                    <li>
                        <DashboardIcon className='icons' />
                        <span>Dashboard</span>
                    </li>
                </ul>

                <ul>
                <p className="title" >Lists</p>
                    <li>
                    <Person2OutlinedIcon className='icons' />
                        <span>Users</span>
                        </li>
                </ul>
                <ul>
                    <li>
                    <ProductionQuantityLimitsIcon className='icons' />
                        <span>Products</span>
                        </li>
                </ul>
                <ul>
                    <li>
                    <BorderTopOutlinedIcon className='icons' />
                        <span>Order</span>
                        </li>
                </ul>

                <ul>
                <p className="title">Useful</p>
                    <li>
                    <QueryStatsIcon className='icons' />
                        <span>Stats</span>
                        </li>
                </ul>
                <ul>
                    <li>
                    <NotificationsNoneOutlinedIcon className='icons' />
                        <span>Notification</span>
                        </li>
                </ul>
                <ul>
                    <li>
                    <PsychologyRoundedIcon className='icons' />
                        <span>Logs</span>
                        </li>
                </ul>
                <ul>
                    <li>
                    <SettingsApplicationsOutlinedIcon className='icons' />
                        <span>Sttings</span>
                        </li>
                </ul>

                <ul>
                <p className="title">Users</p>
                    <li>
                    <AccountCircleOutlinedIcon className='icons' />
                        
                        <span>Profile</span>
                        </li>
                </ul>

                <ul>
                    <li>
                    <ExitToAppOutlinedIcon className='icons' />                        
                        <span onClick={ handleLogout}>logout</span>
                    </li>
                </ul>


            </div>
            <div className="bottom">
                <div className="colorOption">
                    
                </div>
                <div className="colorOption">
                    
                </div>
            </div>
        </div>
    )
}

export default SideBar
