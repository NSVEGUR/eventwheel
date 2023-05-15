import { useContext } from 'react';
import { SnackbarContext } from '@/components/Snackbar';

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
