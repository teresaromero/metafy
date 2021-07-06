import { Request, Response, Router } from 'express'
import config from '../config'
import { KubeClient } from '../libs/k8s'

const k8sRouter = Router()

k8sRouter.get('/deployments', async (req: Request, res: Response) => {
  try {
    const { items } = await KubeClient.getDeployments(config.NAMESPACE)
    const deployments = items.map(({ metadata, status }) => ({
      name: metadata?.name,
      namespace: metadata?.namespace,
      replicas: status?.replicas,
      availableReplicas: status?.availableReplicas,
      readyReplicas: status?.readyReplicas
    }))

    res.send({ count: deployments.length, deployments })
  } catch (error) {
    res.send(error)
  }
})

k8sRouter.get('/statefulset', async (req: Request, res: Response) => {
  try {
    const { items } = await KubeClient.getStatefulSet(config.NAMESPACE)
    const statefulsets = items.map(({ metadata, status }) => ({
      name: metadata?.name,
      namespace: metadata?.namespace,
      replicas: status?.replicas,
      readyReplicas: status?.readyReplicas
    }))
    res.send({ count: statefulsets.length, statefulsets })
  } catch (error) {
    res.send(error)
  }
})

export { k8sRouter }
