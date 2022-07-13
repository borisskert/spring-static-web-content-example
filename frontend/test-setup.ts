import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import {configure} from '@testing-library/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing";

configure({
  defaultImports: [
    ReactiveFormsModule,
    HttpClientTestingModule,
  ],
});
