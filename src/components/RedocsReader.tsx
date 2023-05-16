"use client";

import React from "react";
import { RedocStandalone } from "redoc";

interface Props {
  spec: any;
}

export default function RedocsReader({ spec }: Props) {
  return <RedocStandalone spec={spec} />;
}
