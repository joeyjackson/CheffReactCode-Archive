import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation } from 'mdbreact';

const CategoryFilterStepper = () => {
  const [meatsAndPoultryBtn, setMeatsAndPoultryBtn] = useState(false);
  const [dairyBtn, setDairyBtn] = useState(false);
  const [grainBtn, setGrainBtn] = useState(false);
  const [vegetablesBtn, setVegetablesBtn] = useState(false);
  const [fruitsBtn, setFruitsBtn] = useState(false);
  const [beveragesBtn, setBeveragesBtn] = useState(false);

  return (
    <MDBContainer style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <MDBRow>
        <MDBCol className="text-center">
          {meatsAndPoultryBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setMeatsAndPoultryBtn(!meatsAndPoultryBtn)}
              >
                Meats and Poultry
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setMeatsAndPoultryBtn(!meatsAndPoultryBtn)}
            >
              Meats and Poultry
            </MDBBtn>
          )}
        </MDBCol>

        <MDBCol className="text-center">
          {dairyBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setDairyBtn(!dairyBtn)}
              >
                Dairy
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setDairyBtn(!dairyBtn)}
            >
              Dairy
            </MDBBtn>
          )}
        </MDBCol>

        <MDBCol className="text-center">
          {grainBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setGrainBtn(!grainBtn)}
              >
                Grain
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setGrainBtn(!grainBtn)}
            >
              Grain
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className="text-center">
          {vegetablesBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setVegetablesBtn(!vegetablesBtn)}
              >
                Vegetables
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setVegetablesBtn(!vegetablesBtn)}
            >
              Vegetables
            </MDBBtn>
          )}
        </MDBCol>
        <MDBCol className="text-center">
          {fruitsBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setFruitsBtn(!fruitsBtn)}
              >
                Fruits
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setFruitsBtn(!fruitsBtn)}
            >
              Fruits
            </MDBBtn>
          )}
        </MDBCol>

        <MDBCol className="text-center">
          {beveragesBtn ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() => setBeveragesBtn(!beveragesBtn)}
              >
                Beverages
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() => setBeveragesBtn(!beveragesBtn)}
            >
              Beverages
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CategoryFilterStepper;
