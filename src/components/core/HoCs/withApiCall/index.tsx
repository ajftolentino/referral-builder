import React, { useEffect } from 'react';

/**
 * A Higher-Order Component (HOC) that triggers an API call when the wrapped component mounts.
 *
 * @param {Function} apiCall - A function to execute when the component mounts.
 * @returns {Function} - A function that takes a React functional component and returns an enhanced component.
 *
 * @example
 * const fetchData = () => console.log("Fetching data...");
 * const EnhancedComponent = withApiCall(fetchData)(MyComponent);
 *
 * When `EnhancedComponent` mounts, `fetchData()` is called automatically.
 */
export const withApiCall =
  (apiCall: () => void) => (WrappedComponent: React.FC) => {
    const EnhancedComponent = (props: any) => {
      useEffect(() => {
        apiCall();
      }, []);

      return <WrappedComponent {...props} />;
    };
    EnhancedComponent.displayName = `WithApiCall(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return EnhancedComponent;
  };
