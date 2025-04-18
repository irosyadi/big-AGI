import * as React from 'react';

import { Breadcrumbs, Typography } from '@mui/joy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Link } from '~/common/components/Link';


const _sx = { p: 0 };

export function AppBreadcrumbs(props: {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  rootTitle?: React.ReactNode;
  onRootClick?: () => void;
}) {

  // prevent default href

  const { rootTitle, onRootClick } = props;
  const handleRootClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onRootClick?.();
  }, [onRootClick]);

  return <Breadcrumbs size={props.size || 'sm'} separator={<KeyboardArrowRightIcon />} aria-label='breadcrumbs' sx={_sx}>
    {(props.children && !!rootTitle && !!onRootClick)
      ? <AppBreadcrumbs.Link color='neutral' href='#' onClick={handleRootClick}>{props.rootTitle}</AppBreadcrumbs.Link>
      : (typeof props.rootTitle === 'string') ? <Typography>{props.rootTitle}</Typography>
        : props.rootTitle
    }
    {props.children}
    {/*{nav.pnt === 'create-new' && <Link color='neutral' href='#'>Create New</Link>}*/}
    {/*{['Characters', 'Futurama', 'TV Shows', 'Home'].map((item: string) => (*/}
    {/*  <Link key={item} color='neutral' href='#'>*/}
    {/*    {item}*/}
    {/*  </Link>*/}
    {/*))}*/}
  </Breadcrumbs>;
}

// Important, use this as Link
AppBreadcrumbs.Link = Link;

// Important, use this as Leaf
AppBreadcrumbs.Leaf = Typography;
