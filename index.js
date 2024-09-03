import React, { useState } from 'react';
import {
  HomeOutlined, EyeOutlined, FileAddOutlined, OrderedListOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import { LogoutOutlined } from '@mui/icons-material';
import { useAuthContext } from '../../Contexts/AuthContext';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick, // Add onClick for menu items
  };
}

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogout } = useAuthContext();

  const items = [
    getItem(<Link to='/dashboard' style={{ textDecoration: 'none' }}>Home</Link>, '1', <HomeOutlined />),
    getItem('Todos', 'sub2', <OrderedListOutlined />, [
      getItem(<Link to='/dashboard/addtodos' style={{ textDecoration: 'none' }}>Add-Todos</Link>, '3', <FileAddOutlined />),
      getItem(<Link to='/dashboard/todos' style={{ textDecoration: 'none' }}>Show-Todos</Link>, '4', <EyeOutlined />),
    ]),
    getItem(<span>Logout</span>, '5', <LogoutOutlined />, null, handleLogout),
  ];

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};
