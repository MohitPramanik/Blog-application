const user = {
  name: "Mohit Kumar",
  username: "@mohitdev",
  bio: "Frontend Developer passionate about building responsive and interactive web applications using React.js and modern web technologies.",
  email: "mohit@example.com",
  location: "Bihar, India",
  website: "https://portfolio.example.com",
  joined: "January 2025",
  followers: 1240,
  following: 310,
  posts: 48,
  profileImage:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
};

const ProfilePage = () => {

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            {/* Cover Section */}
            <div
              className="bg-dark"
              style={{
                height: "220px",
                backgroundImage:
                  "linear-gradient(135deg, #343a40, #212529)",
              }}
            ></div>

            {/* Profile Info */}
            <div className="card-body position-relative px-4 pb-4">
              {/* Profile Image */}
              <div
                className="position-absolute"
                style={{ top: "-70px" }}
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="rounded-circle border border-4 border-white shadow"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Edit Button */}
              <div className="d-flex justify-content-end">
                <button className="btn btn-outline-dark rounded-pill px-4">
                  Edit Profile
                </button>
              </div>

              {/* User Details */}
              <div className="mt-5 pt-4">
                <h2 className="fw-bold mb-1">{user.name}</h2>
                <p className="text-muted mb-3">{user.username}</p>

                <p className="mb-4" style={{ maxWidth: "700px" }}>
                  {user.bio}
                </p>

                {/* Extra Info */}
                <div className="d-flex flex-wrap gap-4 text-muted mb-4">
                  <span>📍 {user.location}</span>
                  <span>📧 {user.email}</span>
                  <span>
                    🔗{" "}
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      Portfolio
                    </a>
                  </span>
                  <span>🗓 Joined {user.joined}</span>
                </div>

                {/* Stats */}
                <div className="row text-center g-3">
                  <div className="col-md-4">
                    <div className="border rounded-4 p-3">
                      <h4 className="fw-bold mb-1">{user.posts}</h4>
                      <p className="text-muted mb-0">Posts</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded-4 p-3">
                      <h4 className="fw-bold mb-1">{user.followers}</h4>
                      <p className="text-muted mb-0">Followers</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border rounded-4 p-3">
                      <h4 className="fw-bold mb-1">{user.following}</h4>
                      <p className="text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className="card shadow border-0 rounded-4 mt-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Recent Posts</h4>

              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="border rounded-4 p-3 mb-3"
                >
                  <h5 className="fw-semibold">
                    Blog Post Title {post}
                  </h5>

                  <p className="text-muted mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Humans continue placing divs inside divs hoping the CSS
                    gods will show mercy.
                  </p>

                  <small className="text-secondary">
                    Published 2 days ago
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;