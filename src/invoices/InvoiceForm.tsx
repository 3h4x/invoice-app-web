import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Alert, Container, Box, Grid, Typography, TextField, IconButton, Button } from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'

const InvoiceItemSchema = yup.object({
  description: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
})

type InvoiceItemSchema = yup.InferType<typeof InvoiceItemSchema>

const InvoiceFormSchema = yup.object({
  number: yup.number().required(),
  projectCode: yup.string(),
  // companyId: yup.string().required(),
  items: yup.array().of(InvoiceItemSchema).required().min(1),
})

export interface InvoiceFormData extends Omit<yup.InferType<typeof InvoiceFormSchema>, 'items'> {
  items: InvoiceItemSchema[]
}

export type InvoiceCreateProps = {
  genericError?: string
  initialValues?: InvoiceFormData
  onInvoiceSubmitRequest: (data: InvoiceFormData) => unknown
}

export const InvoiceForm = (props: InvoiceCreateProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    mode: 'onBlur',
    resolver: yupResolver(InvoiceFormSchema),
    defaultValues: {
      ...props.initialValues,
      items: props.initialValues ? props.initialValues.items : [{}],
    },
  })
  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'items',
  })

  return (
    <Container component='main' maxWidth='md'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {props.genericError ? <Alert severity='error'>{props.genericError}</Alert> : null}
        <Box component='form' onSubmit={handleSubmit(props.onInvoiceSubmitRequest)} noValidate sx={{ mt: 1 }}>
          <Box sx={{ padding: 3, mb: 2, border: '1px solid #e0e0e0', borderRadius: 4 }}>
            <Typography variant='h5'>Main Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  margin='dense'
                  size='small'
                  required
                  id='invoice-number'
                  {...register('number')}
                  label='Invoice Number'
                  autoComplete='number'
                  inputProps={{
                    'data-test': 'invoice-number',
                  }}
                  error={!!errors.number}
                  helperText={errors.number?.message}
                />
                <Grid item xs={4}>
                  <TextField
                    margin='dense'
                    size='small'
                    required
                    id='invoice-project-code'
                    {...register('projectCode')}
                    label='Project Code'
                    autoComplete='project-code'
                    inputProps={{
                      'data-test': 'invoice-project-code',
                    }}
                    error={!!errors.projectCode}
                    helperText={errors.projectCode?.message}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <Controller
                    name='companyId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CompanyPickerContainer
                        pickedCompanyId={field.value}
                        onCompanyPicked={(value) => {
                          field.onChange(value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Company'
                            margin='normal'
                            size='small'
                            error={!!errors.companyId}
                            helperText={errors.companyId?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid> */}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ padding: 3, mb: 2, border: '1px solid #e0e0e0', borderRadius: 4 }}>
            <Typography variant='h5'>Items</Typography>
            {!items.length && errors.items && !errors.items.length ? (
              <Alert severity='error'>Please add at least one item</Alert>
            ) : null}
            {items.map((item, index) => (
              <Box key={index} sx={{ padding: 3, mb: 2 }}>
                <TextField
                  margin='dense'
                  size='small'
                  id='name'
                  label='Description'
                  inputProps={{ ...register(`items.${index}.description`), 'data-test': 'invoice-item-description' }}
                  error={!!errors.items?.[index]?.description ?? false}
                  helperText={errors.items?.[index]?.description?.message ?? ''}
                />
                <TextField
                  margin='dense'
                  size='small'
                  id='quantity'
                  label='Quantity'
                  inputProps={{ ...register(`items.${index}.quantity`), 'data-test': 'invoice-item-quantity' }}
                  error={!!errors.items?.[index]?.quantity ?? false}
                  helperText={errors.items?.[index]?.quantity?.message ?? ''}
                />
                <TextField
                  margin='dense'
                  size='small'
                  id='price'
                  label='Price'
                  inputProps={{ ...register(`items.${index}.price`), 'data-test': 'invoice-item-price' }}
                  error={!!errors.items?.[index]?.price ?? false}
                  helperText={errors.items?.[index]?.price?.message ?? ''}
                />
                <IconButton
                  onClick={(ev) => {
                    ev.preventDefault()
                    remove(index)
                  }}
                  disabled={items.length === 1}
                  aria-label='remove'>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={(ev) => {
                ev.preventDefault()
                append({})
              }}
              startIcon={<AddIcon />}>
              Add Item
            </Button>
          </Box>
          <Box mt={2}>
            <Button type='submit' variant='contained'>
              {' '}
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
