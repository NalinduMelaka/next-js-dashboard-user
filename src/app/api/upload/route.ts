import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import prisma from '@/app/lib/prisma';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

 
  const path = join(process.cwd(), 'public', file.name);
  console.log(`File saved to /public/${file.name}`);

  try {
    const upload = await prisma.upload.create({
      const upload = await prisma.pdfs.create({
      data: {
        title: file.name,
        content: buffer,
      }
    });


    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_FROM, 
        pass: process.env.GMAIL_PASSWORD  
      }
    });

    const info = await transporter.sendMail({
      from: process.env.GMAIL_FROM,   
      to: process.env.GMAIL_TO, 
      subject: 'PDF Uploaded Successfully',
      text: 'The PDF has been uploaded successfully.',
      attachments: [
        {
          filename: file.name
        }
      ]
    } as SendMailOptions);

  } catch (error: any) {
    console.error(`Error creating upload record or sending email: ${error.message}`);
  } finally {
    prisma.$disconnect();
  }

  return NextResponse.json({ success: true });
}
