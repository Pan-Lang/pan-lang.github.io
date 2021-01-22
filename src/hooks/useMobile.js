import { useTheme, useMediaQuery } from '@material-ui/core';

/**
 * Returns whether current screen width is below "md" breakpoint
 */
function useMobile() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  return isMobile;
}

export default useMobile;
