import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import classes from './UserForm.module.css';

const UserForm = ({ method, user }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const cancelHandler = () => {
    navigate('..');
  }
  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={user ? user.name : ''}
        />
      </p>

      <p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          required
          defaultValue={user ? user.username : ''}
        />
      </p>
      <p>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          defaultValue={user ? user.phone : ''}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          required
          defaultValue={user ? user.email : ''}
        />
      </p>
      <p>
        <label htmlFor="date">DOB</label>
        <input
          id="dob"
          type="date"
          name="dob"
          required
          defaultValue={user ? user.dob : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={user ? user.image : ''}
        />
      </p>
      <p>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="5"
          required
          defaultValue={user ? user.notes : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}
export default UserForm;

export async function action({ params, request }) {
  const method = request.method;
  const data = await request.formData();
  const userObj = {
    name: data.get('name'),
    phone: data.get('phone'),
    username: data.get('username'),
    email: data.get('email'),
    notes: data.get('notes'),
    dob: data.get('dob'),
    image: data.get('image')
  }
  let url = 'http://localhost:5000/users';
  if (method === 'PATCH') {
    const userId = params.userId;
    url = 'http://localhost:5000/users/' + userId;
  }
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj)
  };
  const response = await fetch(url, requestOptions);

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save user.' }, { status: 500 });
  }

  return redirect('/users');
}