import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import MultipleFileUploadField from "../upload/MultipleFileUploadField";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, errors }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultipleFileUploadField />
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
