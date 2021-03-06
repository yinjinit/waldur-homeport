import * as React from 'react';

import { translate } from '@waldur/i18n';
import { Screenshot } from '@waldur/marketplace/types';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { ModalDialog } from '@waldur/modal/ModalDialog';

interface ViewOfferingScreenshotDialogProps {
  resolve: Screenshot;
}

export const ViewOfferingScreenshotDialog = (
  props: ViewOfferingScreenshotDialogProps,
) => (
  <ModalDialog
    title={translate('Viewing screenshot')}
    footer={<CloseDialogButton />}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <img src={props.resolve.image} alt={translate('Screenshot here')} />
      <span style={{ marginTop: '10px' }}>{props.resolve.description}</span>
    </div>
  </ModalDialog>
);
