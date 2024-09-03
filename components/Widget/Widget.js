import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const Widget = ({type}) => {
let data;

let amount=100;

switch (type) {
    case "user":
        data={
            title:"User",
            isMoney:false,
            link:'See all users',
            icon:(<PersonOutlinedIcon className='icon'   style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}/>
            )

        }
        
        break;
        case "order":
        data={
            title:"Order",
            isMoney:false,
            link:'View all orders',
            icon:(<ShoppingCartOutlinedIcon className='icon' style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}/>
            )

        }
        
        break;
        case "earning":
        data={
            title:"Eanrning",
            isMoney:true,
            link:'Your Earning',
            icon:(<MonetizationOnOutlinedIcon className='icon'  style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}/>
            )

        }
        
        break;
        case "balance":
        data={
            title:"Balance",
            isMoney:true,
            link:'Remaining balance',
            icon:(<AccountBalanceWalletOutlinedIcon className='icon'  style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}/>
            )

        }
        
        break;

    default:
        break;
}






    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {amount} </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    20%
                </div>
               {data.icon}
            </div>

        </div>
    )
}

export default Widget
