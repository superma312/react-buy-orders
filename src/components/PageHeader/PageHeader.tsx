import React from 'react';

interface IPageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: IPageHeaderProps) => {
  return <h1 className='text-center my-5'>{title}</h1>
};

export default PageHeader;
