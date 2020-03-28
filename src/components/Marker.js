import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 18px;
  height: 18px;
  background-color: palevioletred;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;
const InfoWindow = styled.div`
  position: relative;
  bottom: 150px;
  left: -45px;
  width: 220px;
  height: 100px;
  background-color: white;
`;

const Marker = props => (
  <>
    <Wrapper
      alt={props.text}
      {...(props.onClick ? { onClick: props.onClick } : {})}
    />
    {props.show && <InfoWindow />}
  </>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
