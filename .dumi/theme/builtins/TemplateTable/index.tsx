import React from 'react';
import { Table, Button } from 'antd';
import { isAbsoluteURL } from '@wuxh/utils';
import type { TableProps } from 'antd';

interface Template {
  name: string;
  description?: string;
  github?: string;
  online?: string;
}

const templates: TableProps<Template>['dataSource'] = [
  {
    name: 'react-ui-library',
    description: 'Component Library Complete Solutions',
    github: 'template-pro/react-ui-library',
    online: 'https://template-pro.js.org/react-ui-library'
  },
  {
    name: 'tiny-react-project',
    description: 'The React Project Template',
    github: 'template-pro/tiny-react-project'
  },
  {
    name: 'ts-library',
    description: 'The TypeScript library template',
    github: 'template-pro/ts-library'
  },
  {
    name: 'vue2-component-library',
    description: 'The Vue2 components library',
    github: 'template-pro/vue2-component-library',
  },
];

const columns: TableProps<Template>['columns'] = [
  {
    title: 'Project Name',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Github',
    dataIndex: 'github',
    render(text) {
      let url = text;
      if (!isAbsoluteURL(text)) {
        url = `https://github.com/${text}`;
      }

      return <Button href={url} target="_blank" type="link">{text}</Button>
    },
  },
  {
    title: 'Online',
    dataIndex: 'online',
    align: 'center',
    render: (url) => url
      ? <Button href={url} target="_blank" type="link">online preview</Button>
      : '--'
  },
  {
    title: 'Badge',
    key: 'badge',
    dataIndex: 'github',
    align: 'center',
    render: (text) => {
      if (isAbsoluteURL(text)) {
        return null
      }
      const githubUrl = `https://github.com/${text}`
      return (
        <Button href={githubUrl} target="_blank" type="link">
          <img alt="GitHub Repo stars" src={`https://img.shields.io/github/stars/${text}`} />
        </Button>
      )
    }
  },
  {
    title: 'Action',
    key: 'Action',
    fixed: 'right',
    align: 'center',
    render: (_, record) => {
      let url = record.github;
      if (url && !isAbsoluteURL(url)) {
        url = `https://github.com/${url}`
      }
      // github use template
      url += '/generate'
      return <Button href={url} target="_blank" type="primary">Usage</Button>
    }
  }
];

function TemplateTable() {


  return <Table bordered dataSource={templates} columns={columns} />;
}

export default TemplateTable;
