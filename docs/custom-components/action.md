# Form Action

An action represents any user interaction possibility within a form. This could be an add-row button in a form array for example.

To create an action component see the following example.

```typescript
@ActionControl({
  type: 'add-action',
})
@Component({
  selector: 'add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss'],
})
export class ActionButtonsComponent {
  constructor(
    @Inject(CONTROL_ID) public id: ControlId,
    @Inject(FORM_CONTROL) public action: FormActionControl,
    private actionService: ActionService
  ) {}

  @ControlFactory()
  public static createActions() {
    return ActionControlFactory.create();
  }

  clickAddButton() {
    this.actionService.emitAction(this.id.getId());
  }
}
```

```html
<button (click)="clickAddButton()" [disabled]="action.disabled" mat-icon-button type="button">
  <mat-icon>add_circle_outline</mat-icon>
</button>
```

To listen on action events the `aff-form-group` offers an `@Output` with name `[action].

```html
<aff-form-group (action)="doSomething($event)"></aff-form-group>
```

It is also possible to inject the `ActionService` within any form component and subscribe to the action observable

```typescript
  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this._actionSub = this.actionService.actions.subscribe(event => {
        ...
    });
  }
```

## Multiple actions

It is possible to add multiple actions in one component. With the `ActionGroupFactory` you can create an action group, similar to a `FormGroup` in an Angular reactive form.
To emit different actions a postfix is required like
`actionService.emitAction(this.id.getId() + 'another-action');`.
