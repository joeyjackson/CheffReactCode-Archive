import React from 'react';
import { MDBSticky, MDBStickyContent, MDBContainer } from 'mdbreact';

const StickyPage = () => {
  const wrapper = { height: '3500px', backgroundColor: 'rgba(0,0,0,.15)' };

  const background = {
    width: '100%',
    backgroundColor: '#fff',
    height: '3000px',
    lineHeight: '1.5'
  };

  const headerStyle = {
    width: '100%',
    background: '#2f93ce',
    color: '#fff',
    padding: '10px 20px',
    margin: '0'
  };

  const mainWrapper = { width: 960, margin: '0 auto' };

  return (
    <MDBContainer>
      <div style={wrapper} className="mt-4">
        <div style={background}>
          <div style={mainWrapper}>
            <MDBStickyContent style={{ background: '#fff', height: '465px' }}>
              <MDBSticky>
                {({ style }) => {
                  return (
                    <div
                      style={{
                        ...style
                      }}
                    >
                      <div style={headerStyle}>
                        <h2 className="h1-responsive">
                          MDBSticky Content demo
                        </h2>
                        <h4>Scroll down to see the effect</h4>
                      </div>
                    </div>
                  );
                }}
              </MDBSticky>
            </MDBStickyContent>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default StickyPage;
