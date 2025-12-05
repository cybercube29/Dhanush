import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

import NavItem from '../NavItem';

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { isNull } from 'lodash';

export default function NavCollapse({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick
}) {
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state) => state.customizer);
  const Icon = menu?.icon;
  const theme = useTheme();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (pathDirect.includes(menu.href) || pathWithoutLastPart.includes(menu.href)) {
      setOpen(true);
    }
  }, [menu.href, pathDirect, pathWithoutLastPart]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: '4px',
    padding: '0 ',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    backgroundColor: open && level < 2 ? theme.palette.primary.main : '',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor:
        pathname.includes(menu.href) || open
          ? theme.palette.primary.main
          : theme.palette.primary.light,
      color: pathname.includes(menu.href) || open ? 'white' : theme.palette.primary.main,
    },
    color:
      open && level < 2
        ? 'white'
        : `inherit` && level > 1 && open
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
    borderRadius: `${customizer.borderRadius}px`,
  }));

  const submenus = menu.children?.map((item) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        // disablePadding   // 🔥 pass karo har child ko
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={lgUp ? onClick : isNull}
        // disablePadding   // 🔥 pass karo har child ko
        />
      );
    }
  });


  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: '22px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {React.createElement(menu.icon, { size: 13.5 })}
        </ListItemIcon>
        <ListItemText color="inherit" sx={{ fontSize: '3rem' }}>{hideMenu ? '' : <>{t(`${menu.title}`)}</>}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto">
        {submenus}
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  pathWithoutLastPart: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};
