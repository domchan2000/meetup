import { useContext } from "react";
import ImportantContext from "../store/important-context";
import MeetupList from "../components/meetups/MeetupList";

function ImportantPage() {
  const importantCtx = useContext(ImportantContext);

  let content;

  if (importantCtx.totalImportant === 0) {
    content =<h2>No Important</h2>
  }
  else {
    content = <MeetupList meetups = {importantCtx.important} />
  }

  return (
    <section>
      <h1>My Important</h1>
      {content}
    </section>
  );
}

export default ImportantPage;
