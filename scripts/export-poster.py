from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.barcode.qr import QrCodeWidget
from PIL import Image, ImageDraw
from pypdf import PdfReader
import pypdfium2 as pdfium
import zxingcpp

root=Path(__file__).resolve().parents[1]; out=root/'output/pdf'; tmp=root/'tmp/pdfs'; out.mkdir(parents=True,exist_ok=True); tmp.mkdir(parents=True,exist_ok=True)
url='https://nails-by-sharline.vercel.app/'
pdfmetrics.registerFont(TTFont('Segoe','C:/Windows/Fonts/segoeui.ttf'))
pdfmetrics.registerFont(TTFont('SegoeBold','C:/Windows/Fonts/segoeuib.ttf'))
pdfmetrics.registerFont(TTFont('SegoeLight','C:/Windows/Fonts/segoeuil.ttf'))
ink=HexColor('#302333'); plum=HexColor('#57334f'); muted=HexColor('#6b5f70'); line=HexColor('#ddd5e0')
q=QrCodeWidget(url,barLevel='M'); q.qr.make(); modules=q.qr.modules; n=len(modules); border=4; scale=20
im=Image.new('RGB',((n+border*2)*scale,)*2,'white'); draw=ImageDraw.Draw(im)
for row in range(n):
 for col in range(n):
  if modules[row][col]:
   x=(col+border)*scale; y=(row+border)*scale
   draw.rectangle((x,y,x+scale-1,y+scale-1),fill='black')
qr_path=out/'sharline-website-qr.png'; im.save(qr_path)
assert zxingcpp.read_barcode(im).text==url

from fontTools.ttLib import TTFont as FontToolsFont
for name,file in [('Display','clash-display-600'),('Body','satoshi-400'),('Bold','satoshi-700')]:
 f=FontToolsFont(root/'assets/fonts'/f'{file}.woff2');f.flavor=None
 for record in f['name'].names:
  if record.nameID in [1,4,6]: record.string=('Sharline'+name).encode(record.getEncoding())
 f.save(tmp/f'{name}.ttf')
 pdfmetrics.registerFont(TTFont(name,str(tmp/f'{name}.ttf')))
path=out/'nails-by-sharline-a4-price-poster.pdf'
c=canvas.Canvas(str(path),pagesize=A4); w,h=A4
c.setTitle('Nails by Sharline - A4 Price Poster'); c.setAuthor('Nails by Sharline')
def text(x,y,s,size=12,font='Body',color=ink):
 c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def right(x,y,s,size=12,font='Body',color=ink):
 c.setFillColor(color);c.setFont(font,size);c.drawRightString(x,y,s)
def rule(y):
 c.setStrokeColor(line);c.setLineWidth(.6);c.line(36,y,w-36,y)
# Print hierarchy: sculptural hero, distinctive display type and large prices.
text(36,793,'s.',40,'Display',plum);text(89,798,'nails by sharline',22,'Display',plum)
rule(775)
art=Image.open(root/'assets/poster-nails.png');art_width=230;art_height=art_width*art.height/art.width
c.drawImage(str(root/'assets/poster-nails.png'),329,612,width=art_width,height=art_height,mask='auto')
text(36,710,'Your little',48,'Display',plum)
c.saveState();t=c.beginText(54,652);t.setFont('Display',46);t.setTextRenderMode(1);c.setStrokeColor(plum);c.setLineWidth(.8);t.textOut('nail reset.');t.setTextRenderMode(0);c.drawText(t);c.restoreState()
rule(600)
rows=[('Manicure','₱100'),('Pedicure','₱100'),('Foot spa','₱250'),('Foot spa + pedicure','₱300')]
for i,(label,price) in enumerate(rows):
 y=554-i*50
 text(36,y,label,25,'Display',plum);right(w-36,y-1,price,34,'SegoeBold',plum);rule(y-16)
c.setFillColor(plum);c.roundRect(28,325,w-56,60,14,fill=1,stroke=0)
text(44,353,'All three',25,'Display',HexColor('#ffffff'))
right(w-44,346,'₱400',36,'SegoeBold',HexColor('#ffffff'))
text(44,335,'Manicure + pedicure + foot spa',11,'Body',HexColor('#ffffff'))
text(36,300,'Available colors',12,'Bold',plum)
swatches=['#e2bb06','#ad2924','#a7b3d4','#9c979b','#f4f1f3','#b68a5d','#b8bdb8','#c34a99','#202023']
for i,shade in enumerate(swatches):
 x=48+i*(w-96)/8
 c.setFillColor(HexColor(shade));c.setStrokeColor(HexColor('#6b5f70') if i==4 else line);c.setLineWidth(1.5 if i==4 else .65);c.circle(x,278,12,fill=1,stroke=1)
 c.saveState();c.setFillAlpha(.28);c.setFillColor(HexColor('#ffffff'));c.circle(x-3,282,3,fill=1,stroke=0);c.restoreState()
text(36,255,'Actual shades may vary.',8,color=muted)
c.setFillColor(HexColor('#eee8f1'));c.roundRect(28,28,w-56,208,18,fill=1,stroke=0)
text(44,212,'Message on Facebook',14,'Bold',plum)
text(44,183,'Sharline Albino',27,'Display',plum)
text(44,166,'(Camille)',12,'Body',plum)
c.linkURL('https://www.facebook.com/sharlinemae.albino.71',(44,160,400,221),relative=0)
text(44,139,'Generoso Sari-Sari Store',14,'Bold')
text(44,121,'Phase 2, Mt. Claire Village',13)
text(44,97,'Home service available',14,'Bold',plum)
text(44,80,'Within Mt. Claire Village only',12)
text(44,46,'nails-by-sharline.vercel.app',14,'Bold',plum)
c.linkURL(url,(44,40,370,61),relative=0)
qr_x=w-158;qr_y=100;qr_size=112
c.drawImage(str(qr_path),qr_x,qr_y,width=qr_size,height=qr_size)
c.setFont('Bold',10);c.setFillColor(plum);c.drawCentredString(qr_x+qr_size/2,85,'Scan to view')
c.linkURL(url,(qr_x,qr_y,qr_x+qr_size,qr_y+qr_size),relative=0)

c.showPage();c.save()
r=PdfReader(str(path));assert len(r.pages)==1
assert abs(float(r.pages[0].mediabox.width)-595.276)<.1
assert abs(float(r.pages[0].mediabox.height)-841.89)<.1
extracted=r.pages[0].extract_text()
for term in ['₱100','₱250','₱300','₱400','Manicure + pedicure + foot spa','Sharline Albino','(Camille)','nails-by-sharline.vercel.app','Generoso Sari-Sari Store','Phase 2, Mt. Claire Village','Home service available','Within Mt. Claire Village only']:
 assert term in extracted,term
assert 'gel polish' not in extracted.lower()
assert '₱200' not in extracted
pdf=pdfium.PdfDocument(str(path));preview=pdf[0].render(scale=300/72).to_pil();preview.save(out/'nails-by-sharline-a4-price-poster.png',dpi=(300,300));pdf[0].render(scale=1.5).to_pil().save(out/'nails-by-sharline-a4-preview.png')
assert any(x.text==url for x in zxingcpp.read_barcodes(preview)),'Rendered poster QR failed'
assert any(x.text==url for x in zxingcpp.read_barcodes(preview.resize((1240,1754)))),'Half-size QR failed'
print('PASS: single A4 page, all prices/contact/location verified, standalone and rendered QR decoded at full and half size. PDF and 300dpi PNG saved.')
