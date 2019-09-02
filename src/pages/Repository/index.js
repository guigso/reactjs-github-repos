import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList, Buttons, Paginator } from './styles';

import Container from '../../components/Container/index';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    searchState: 'open',
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { searchState } = this.state;

    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      await api.get(`/repos/${repoName}`),
      await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: searchState,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { searchState, page } = this.state;
    if (prevState.searchState !== searchState || prevState.page !== page) {
      const { match } = this.props;
      const repoName = decodeURIComponent(match.params.repository);
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: searchState,
          per_page: 5,
          page,
        },
      });
      this.setState({
        issues: issues.data,
      });
    }
  }

  render() {
    const { repository, issues, loading, searchState, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Buttons selectedState={searchState}>
          <div
            className="open"
            onClick={() => this.setState({ searchState: 'open' })}
          >
            OPEN
          </div>
          <div
            className="closed"
            onClick={() => this.setState({ searchState: 'closed' })}
          >
            CLOSED
          </div>
          <div
            className="all"
            onClick={() => this.setState({ searchState: 'all' })}
          >
            ALL
          </div>
        </Buttons>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Paginator disabled={page === 1}>
          <div
            onClick={() =>
              page === 1 ? '' : this.setState({ page: page - 1 })
            }
          >
            Página Anterior
          </div>
          <div onClick={() => this.setState({ page: page + 1 })}>
            Próxima Página
          </div>
        </Paginator>
      </Container>
    );
  }
}
