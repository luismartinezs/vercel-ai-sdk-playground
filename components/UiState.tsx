'use client'

import { AI } from "@/app/action";
import { useUIState } from "ai/rsc";

const UiState = (): React.JSX.Element => {
  const [ui] = useUIState<typeof AI>();

  return (
    <div>
      <h2>UI State</h2>
       {ui.length > 0 ? ui.map((message: { id: number; component: React.ReactNode }) => (
        <div key={message.id}>{message.component}</div>
      )) : <p>Nothing to show</p>}
    </div>
  );
};

export default UiState
