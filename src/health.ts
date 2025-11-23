export default function healthHandler(_req: any, res: any) {
  res.status(200).json({ status: "ok", service: "blackroad-os-prism-console" });
}
