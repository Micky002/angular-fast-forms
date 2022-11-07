# Injection

The following table shows all injectable types which can be used
in a control component.


| Name | Inject via type | Inject via token | Description |
| ---- | --------------- | ---------------- | ----------- |
| Reactive form control | - | `FORM_CONTROL` | Inject the actual control. Can be type of `FormGroup`, `FormControl`, `FormActionControl`, `FormActionGroup`, `FormArray` |
| Question definition | `QuestionDefinition` | - | Inject a parial type of the question definition given |
| Question properties | - | `CONTROL_PROPERTIES` | Inject the properties part of the Question separately |
| Control ID | - | `CONTROL_ID` | Helper to create the full path of a control |
| ActionService | `ActionService` | - | Helper to construct action events from an action control |

