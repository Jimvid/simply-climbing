import { useAuth, useUser } from '@clerk/clerk-react'
import { Calendar, Envelope, SignOut, User } from '@phosphor-icons/react'

export const Profile = () => {
  const { user } = useUser()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col pt-6">
      <div className="flex-1 max-w-md mx-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-base-content mb-2">Profile</h1>
          <p className="text-base-content/70">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" />
                  ) : (
                    <div className="bg-base-300 flex items-center justify-center">
                      <User size={40} className="text-base-content/60" />
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                <h2 className="card-title text-base-content">
                  {user.fullName || user.firstName || 'Anonymous User'}
                </h2>

                {user.primaryEmailAddress && (
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Envelope size={16} />
                    <span className="text-sm">
                      {user.primaryEmailAddress.emailAddress}
                    </span>
                  </div>
                )}

                {user.createdAt && (
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Calendar size={16} />
                    <span className="text-sm">
                      Member since{' '}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title text-xs">Total Climbs</div>
            <div className="stat-value text-2xl text-primary">0</div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title text-xs">Best Grade</div>
            <div className="stat-value text-2xl text-primary">-</div>
          </div>
        </div>
      </div>

      {/* Actions - Fixed at bottom */}
      <div className="max-w-md mx-auto w-full p-6">
        <div className="space-y-3">
          <button onClick={handleSignOut} className="btn btn-primary w-full">
            <SignOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
