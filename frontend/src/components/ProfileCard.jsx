import React from 'react';

const ProfileCard = ({
  user,
  className = '',
  imageClassName = '',
  textClassName = '',
  showText = true,
  size = 'md' // 'sm' | 'md' | 'lg'
}) => {

  const sizeClasses = {
    sm: { img: 'profile-img-sm', text: 'text-sm' },
    md: { img: 'profile-img-md', text: '' },
    lg: { img: 'profile-img-lg', text: 'fs-5' } 
  };

  const { img: imgSizeClass, text: textSizeClass } = sizeClasses[size];

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <img
        className={`rounded-circle object-cover ${imgSizeClass} ${imageClassName}`}
        alt={user.name}
        src={user.profile_photo || '/images/default-avatar.png'}
      />

      {showText && (
        <div className={`ms-3 ${textClassName}`}>
          <div className={`fw-medium text-dark ${textSizeClass}`}>
            {user.name}
          </div>
          <div className="text-sm text-muted">
            {user.role === 'вчитель' ? 'Вчитель' : `Учень ${user.class}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;