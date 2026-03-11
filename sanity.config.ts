"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/lib/env";
import { schemaTypes } from "./sanity/schemaTypes";
import {
  fixedDocumentTypes,
  singletonActions,
  singletonTypes,
  structure,
} from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Cosmetech Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) => {
      if (singletonTypes.has(context.schemaType) || fixedDocumentTypes.has(context.schemaType)) {
        return previousActions.filter(
          (action) => action.action && singletonActions.has(action.action)
        );
      }

      return previousActions;
    },
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter(
        (option) =>
          !singletonTypes.has(option.templateId) && !fixedDocumentTypes.has(option.templateId)
      ),
  },
});
