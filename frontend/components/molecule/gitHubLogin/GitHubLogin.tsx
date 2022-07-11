import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/SuperbaseService';
import LoadingButton from '../../atoms/loadingButton/LoadingButton';

const GitHubLogin: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGitHubLoginClick = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signIn({
        provider: 'github',
      });

      if (error) {
        alert(`${error.status}, ${error.message}`);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton onClick={handleGitHubLoginClick} loading={loading}>
      {loading ? 'Logging in' : 'Login with GitHub'}
    </LoadingButton>
  );
};

export default GitHubLogin;
