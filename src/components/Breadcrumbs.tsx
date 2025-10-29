import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../routes';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: ROUTES.HOME }}>
        {ROUTE_LABELS.HOME}
      </Breadcrumb.Item>
      {crumbs.map((crumb, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={crumb.path ? Link : undefined}
          linkProps={crumb.path ? { to: crumb.path } : undefined}
          active={!crumb.path}
        >
          {crumb.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};