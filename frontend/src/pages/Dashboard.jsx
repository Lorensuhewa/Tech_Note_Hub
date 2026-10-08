function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem('user')
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.name || 'User'}!
      </p>

      <p>
        Your notes will appear here.
      </p>
    </div>
  );
}

export default Dashboard;