import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from './Loader/Loader';

interface PeopleTableProps {
  people: Person[];
  isLoading: boolean;
  error: string;
}

export const PeopleTable = ({ people, isLoading, error }: PeopleTableProps) => {
  const { slug: selectedSlug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                const { name, sex, born, died, fatherName, motherName, slug } =
                  person;

                const mother = people.find(p => p.name === motherName);
                const father = people.find(p => p.name === fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={slug}
                    className={
                      slug === selectedSlug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        className={sex === 'f' ? 'has-text-danger' : ''}
                        to={`/people/${slug}`}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    <td>
                      {mother ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${mother.slug}`}
                        >
                          {mother.name}
                        </Link>
                      ) : (
                        motherName || '-'
                      )}
                    </td>

                    <td>
                      {father ? (
                        <Link to={`/people/${father.slug}`}>
                          {father.name}
                        </Link>
                      ) : (
                        fatherName || '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
