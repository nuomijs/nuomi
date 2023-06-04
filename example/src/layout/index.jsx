import React from "react"
import { defineNuomi } from "nuomi";
import Container from "./components/Container";

export default defineNuomi({
  id: 'global',
  state: {
    count: 0,
  },
  render({ children }) {
    return <Container>{ children }</Container>
  }
});
